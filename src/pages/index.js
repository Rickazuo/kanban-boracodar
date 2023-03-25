import styles from "../styles/Home.module.css";
import Image from "next/image";

import penIcon from "../../public/penIcon.svg";
import buttonSearch from "../../public/buttonSearch.svg";

import Kanban from "@/components/Kanban";
import Layout from "@/layouts/Layout";

import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home() {
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.headMain}>
          <h1>Meu Kanban</h1>
          <Image src={penIcon} width={40} height={40} alt="pen icon" />
        </div>
        <div className={styles.search}>
          <button className={styles.buttonSearch}>
            <Image alt="search" src={buttonSearch} />
          </button>
          <label id="search"></label>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="black.600" />}
            />
            <Input id="search" boxShadow="sm" w="full" background="white" type="tel" placeholder="Busque por cards, assuntos ou responsáveis..." />
          </InputGroup>
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
