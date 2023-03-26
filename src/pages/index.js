import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import penIcon from "../../public/penIcon.svg";
import buttonSearch from "../../public/buttonSearch.svg";
import { ColumnType } from "../../utils/columnType";
import Kanban from "@/components/Kanban";
import Layout from "@/layouts/Layout";

import { InputGroup, InputLeftElement, Input, Flex } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const beginTasks = {
  "A fazer": [
    {
      id: 1,
      column: ColumnType.TO_DO,
      description:
        "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
      tags: ["rocketseat", "desafio"],
      title: "#boraCodar um Kanban 🧑‍💻",
    },
    {
      id: 2,
      column: ColumnType.TO_DO,
      description:
        "Manter minha atividade na plataforma da Rocketseat para não perder a ofensiva",
      tags: ["rocketseat"],
      title: "Manter a ofensiva 🔥",
    },
  ],
  Fazendo: [
    {
      id: 3,
      column: ColumnType.IN_PROGRESS,
      description:
        "Conferir o novo projeto do #boraCodar para fazê-lo da melhor maneira possível",
      tags: ["rocketseat", "desafio"],
      title: "Conferir o novo desafio 🚀 ",
    },
  ],
  Feito: [
    {
      id: 4,
      column: ColumnType.COMPLETED,
      description:
        "Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.",
      tags: ["rocketseat", "desafio"],
      title: "#boraCodar uma página de login 🧑‍💻",
    },
  ],
};
export default function Home() {
  const [tasks, setTasks] = useState({...beginTasks});
  const [actualTasks, setActualTasks] = useState({});

  const [existingTags, setExistingTags] = useState([]);
  const [filterTag, setFilterTag] = useState({ filter: false, tag: null });
  const [search, setSearch] = useState("");

  const getTagsOptions = useCallback(() => {
    const tags = [];

    for (const task in tasks) {
      for (let i = 0; i < tasks[task].length; i++) {
        for (let j = 0; j < tasks[task][i].tags.length; j++) {
          if (!tags.includes(tasks[task][i].tags[j].toLowerCase()))
            tags.push(tasks[task][i].tags[j].toLowerCase());
        }
      }
    }

    setExistingTags(tags);
  }, [tasks]);

  const filterTasks = useCallback(() => {
    let match = false;
    const filteredTasks = {
        "A fazer": [
        ],
        Fazendo: [
        ],
        Feito: [
        ],
      };

    for (const task in tasks) {
      for (let i = 0; i < tasks[task].length; i++) {
        
        if (
          search &&
          tasks[task][i].title
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          match = true;

        if (
          search &&
          tasks[task][i].description
            .toLowerCase()
            .includes(search.toLowerCase())
        )
          match = true;

        for (let j = 0; j < tasks[task][i].tags.length; j++) {
          if (
            filterTag.tag &&
            tasks[task][i].tags[j].includes(filterTag.tag.toLowerCase())
          )
            match = true;
        }

        if (!search && !filterTag.tag) match = true
        if (match) filteredTasks[task].push(tasks[task][i])
        match = false;
      }
    }

    setActualTasks(filteredTasks);

  }, [tasks, filterTag, search]);

  useEffect(() => {
    getTagsOptions();
    filterTasks();
  }, [tasks, getTagsOptions, filterTasks, search, filterTag]);

  console.log("tasks", tasks)
  console.log(actualTasks)
  return (
    <Layout>
      <div className={styles.main}>
        <div className={styles.headMain}>
          <h1>Meu Kanban</h1>
          <Image src={penIcon} width={40} height={40} alt="pen icon" />
        </div>
        <div className={styles.search}>
          <button
            onClick={() => setFilterTag((f) => ({ ...f, filter: !f.filter }))}
            className={styles.buttonSearch}
          >
            <Image alt="search" src={buttonSearch} />
          </button>
          <label id="search"></label>
          <InputGroup size="lg">
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<SearchIcon color="black.600" />}
            />
            <Input
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              boxShadow="sm"
              w="full"
              background="white"
              type="tel"
              placeholder="Busque por cards, assuntos ou responsáveis..."
            />
          </InputGroup>
        </div>
        <Flex wrap={true} pl={8} gap={3}>
          {filterTag.filter &&
            existingTags.map((tag) => (
              <span
                onClick={() =>
                  setFilterTag((f) => ({
                    ...f,
                    tag: tag === f.tag ? null : tag,
                  }))
                }
                key={tag}
                className={`${styles.tag} ${
                  tag === filterTag.tag ? styles.tagChoose : ""
                }`}
              >
                {tag}
              </span>
            ))}
        </Flex>
        <div className={styles.cards}>
          <div className={styles.toDo}>
            <Kanban
              tasks={tasks}
              setTasks={setTasks}
              actualTasks={actualTasks}
              setActualTasks={setActualTasks}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
