/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import style from "./styles/Attend.module.scss";

function Card({ img, title }) {
  return (
    <motion.div
      className={style.card}
      initial={{ opacity: 0, y: 50, scale: 0.5 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      <div className={style.cut}></div>
      <div className={style.card_img}>
        <img src={img} alt="Event Image" />
      </div>
      <div className={style.card_content}>
        <h2>{title}</h2>
        <div className={style.cut2}></div>
      </div>
    </motion.div>
  );
}

function Attend() {
  return (
    <>
      <div className={style.main}>
        <div className={style.heading}>
          <div className={style.why}><h1>WHY ATTEND</h1></div>
          <div className={style.omega}><h1>OMEGA?</h1></div>
        </div>

        <div className={style.boxmain}>
          <Card img="https://ucarecdn.com/b41bf74e-a40e-4864-9c45-1b0316faff8f/"  title="Inspiration and Knowledge" />
          <Card img="https://ucarecdn.com/3d7bfff8-602f-41ee-905b-1d8a5f7071ca/" title="Networking Opportunities" />
          <Card img="https://ucarecdn.com/287d8849-00fa-4344-aad2-80e2405e4943/" title="Hands-on Experience" />
          <Card img="https://ucarecdn.com/873c2f03-0697-4152-82d0-fa79c1efe5d7/" title="Exposure and Recognition" />
        </div>
      </div>

     
    </>
  );
}

export default Attend;
