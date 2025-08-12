import React, { useState, useEffect, useContext } from "react";
import { EventCard } from "../../components";
import { Button } from "../../components/Core";
import AuthContext from "../../context/AuthContext";
import { api } from "../../services";
import styles from "./styles/AttendancePage.module.scss";
import { IoClose } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { Alert, ComponentLoading } from "../../microInteraction";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";

const AttendancePage = () => {
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScanner, setShowScanner] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [scanner, setScanner] = useState(null);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get("/api/form/getAllForms");
        if (response.status === 200) {
          const fetchedEvents = response.data.events;

          const sortedEvents = fetchedEvents.sort((a, b) => {
            const priorityA = parseInt(a.info.eventPriority, 10);
            const priorityB = parseInt(b.info.eventPriority, 10);
            const dateA = new Date(a.info.eventDate);
            const dateB = new Date(b.info.eventDate);
            const titleA = a.info.eventTitle || "";
            const titleB = b.info.eventTitle || "";

            if (priorityA !== priorityB) return priorityA - priorityB;
            if (dateA.getTime() !== dateB.getTime()) return dateA - dateB;
            return titleA.localeCompare(titleB);
          });

          const ongoing = sortedEvents.filter(e => !e.info.isEventPast);
          const past = sortedEvents
            .filter(e => e.info.isEventPast)
            .sort((a, b) => new Date(b.info.eventDate) - new Date(a.info.eventDate));

          setOngoingEvents(ongoing);
          setPastEvents(past);
        } else {
          setError("Error fetching events");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Error fetching events");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const initializeScanner = () => {
    const qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA] // ✅ FIXED
      },
      false
    );

    qrScanner.render(onScanSuccess, onScanFailure);
    setScanner(qrScanner);
  };

  const onScanSuccess = async (decodedText) => {
    try {
      const response = await api.post(
        `/api/attendance/verify`,
        {
          eventId: selectedEventId,
          qrData: decodedText,
        },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        }
      );

      if (response.status === 200) {
        Alert({
          type: "success",
          message: "Attendance marked successfully!",
          position: "top-right",
        });
        if (scanner) {
          scanner.clear();
        }
        setShowScanner(false);
      }
    } catch (error) {
      Alert({
        type: "error",
        message: error.response?.data?.message || "Failed to verify QR code",
        position: "top-right",
      });
    }
  };

  const onScanFailure = (error) => {
    console.warn(`QR Code scanning failed: ${error}`);
  };

  const handleScanQR = (eventId) => {
    setSelectedEventId(eventId);
    setShowScanner(true);
  };

  const handleDownloadAttendance = async (eventId) => {
    try {
      const response = await api.get(`/api/attendance/download/${eventId}`, {
        headers: { Authorization: `Bearer ${authCtx.token}` },
        responseType: "blob",
      });
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `attendance_${eventId}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      Alert({
        type: "success",
        message: "Attendance file downloaded successfully!",
        position: "top-right",
      });
    } catch (error) {
      Alert({
        type: "error",
        message: "Failed to download attendance file",
        position: "top-right",
      });
      console.error("Download error:", error);
    }
  };

  const renderOngoingActions = (event) => (
    <div className={styles.actionButtons}>
      <Button onClick={() => handleScanQR(event.id)} variant="primary">
        Scan QR
      </Button>
      <Button
        onClick={() => handleDownloadAttendance(event.id)}
        variant="secondary"
        style={{ padding: "8px 16px", backgroundColor: "rgba(255, 138, 0, 0.9)" }}
      >
        <FaDownload size={18} />
      </Button>
    </div>
  );

  const renderPastActions = (event) => (
    <div className={styles.actionButtons}>
      <Button
        onClick={() => handleDownloadAttendance(event.id)}
        variant="secondary"
        style={{ padding: "8px 16px", backgroundColor: "rgba(255, 138, 0, 0.9)" }}
      >
        <FaDownload size={18} />
      </Button>
    </div>
  );

  useEffect(() => {
    if (showScanner) {
      initializeScanner();
    }
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [showScanner]);

  if (isLoading) {
    return (
      <ComponentLoading
        customStyles={{
          width: "100%",
          height: "100%",
          display: "flex",
          marginTop: "10rem",
          marginBottom: "10rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Event Attendance</h2>

      {showScanner && (
        <div className={styles.scannerModal}>
          <div className={styles.scannerContent}>
            <button
              className={styles.closeButton}
              onClick={() => {
                if (scanner) {
                  scanner.clear();
                }
                setShowScanner(false);
              }}
            >
              <IoClose />
            </button>
            <h3 className={styles.scannerTitle}>Scan QR Code</h3>
            <div className={styles.scannerArea}>
              <div id="qr-reader"></div>
            </div>
          </div>
        </div>
      )}

      {/* Ongoing Events */}
      {ongoingEvents.length > 0 && (
        <>
          <h3>Ongoing Events</h3>
          <div className={styles.eventGrid}>
            {ongoingEvents.map((event) => (
              <div key={event.id} className={styles.eventWrapper}>
                <EventCard
                  data={event}
                  type="ongoing"
                  modalpath="/Events/"
                  isLoading={false}
                  showRegisterButton={false}
                  showShareButton={false}
                  additionalContent={renderOngoingActions(event)}
                  onOpen={() => {}} // ✅ FIXED: Always pass a function
                  customStyles={{
                    eventname: { fontSize: "1.2rem" },
                    registerbtn: { width: "8rem", fontSize: ".721rem" },
                    eventnamep: { fontSize: "0.7rem" },
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>Past Events</h3>
          <div className={styles.eventGrid}>
            {pastEvents.map((event) => (
              <div key={event.id} className={styles.eventWrapper}>
                <EventCard
                  data={event}
                  type="past"
                  modalpath="/Events/pastEvents/"
                  isLoading={false}
                  showRegisterButton={false}
                  showShareButton={false}
                  additionalContent={renderPastActions(event)}
                  onOpen={() => {}} // ✅ FIXED
                  customStyles={{
                    eventname: { fontSize: "1.2rem" },
                    registerbtn: { width: "8rem", fontSize: ".721rem" },
                    eventnamep: { fontSize: "0.7rem" },
                  }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AttendancePage;
