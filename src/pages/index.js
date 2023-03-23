import styles from "../styles/Home.module.css";
import Image from "next/image";

import penIcon from "../../public/penIcon.svg";
import buttonSearch from "../../public/buttonSearch.svg";

import Kanban from "@/components/Kanban";
import Layout from "@/layouts/Layout";

export default function Home() {
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.headMain}>
                    <h1>Meu Kanban</h1>
                    <Image
                        src={penIcon}
                        width={40}
                        height={40}
                        alt="pen icon"
                    />
                </div>
                <div className={styles.search}>
                    <button className={styles.buttonSearch}>
                        <Image src={buttonSearch} />
                    </button>
                    <label id="search"></label>
                    <input className={styles.inputSearch} id="search"></input>
                </div>
                <div className={styles.cards}>
                    <div className={styles.toDo}>
                        <Kanban />
                    </div>
                </div>
            </div>
        </Layout>
    );
}
