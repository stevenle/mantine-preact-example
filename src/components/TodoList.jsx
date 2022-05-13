import { h } from "preact";
import { useState } from "preact/hooks";
import { useListState, randomId } from "@mantine/hooks";
import { Cross1Icon, PlusIcon } from "@modulz/radix-icons";
import {
  Select,
  Title,
  Text,
  Checkbox,
  TextInput,
  ActionIcon,
  Container,
  useMantineTheme,
} from "@mantine/core";
import Footer from "./Footer";

const INITIAL_STATE = [
  { value: "Buy 23 RTX 3080 cards", completed: false, key: randomId() },
  { value: "Mine Ethereum", completed: false, key: randomId() },
  {
    value: "Complain about miners on internet to prove innocence",
    completed: false,
    key: randomId(),
  },
  {
    value: "Sell broken cards on ebay to gamers",
    completed: false,
    key: randomId(),
  },
  {
    value: "Spend received money on new video cards",
    completed: false,
    key: randomId(),
  },
  { value: "Repeat the cycle", completed: false, key: randomId() },
];

export function TodoList() {
  const theme = useMantineTheme();
  const [newItem, setNewItem] = useState("");
  const [state, handlers] = useListState(INITIAL_STATE);

  const items = state.reduce(
    (acc, item, index) => {
      acc[item.completed ? "completed" : "current"].push(
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: theme.spacing.xs,
          }}
          key={item.key}
        >
          <Checkbox
            size="xl"
            checked={item.completed}
            color="gray"
            onChange={(event) => {
              handlers.setItemProp(
                index,
                "completed",
                event.currentTarget.checked
              );
              if (event.currentTarget.checked) {
                handlers.reorder({ from: index, to: state.length - 1 });
              }
            }}
          />

          <TextInput
            style={{ flex: 1, marginLeft: theme.spacing.md }}
            placeholder="Your evil plan part"
            value={item.value}
            onChange={(event) =>
              handlers.setItemProp(index, "value", event.currentTarget.value)
            }
            inputStyle={{
              textDecoration: item.completed && "line-through",
              color: item.completed && theme.colors.gray[5],
            }}
          />

          <ActionIcon
            size="lg"
            style={{ marginLeft: theme.spacing.xs }}
            onClick={() => handlers.remove(index)}
          >
            <Cross1Icon />
          </ActionIcon>
        </div>
      );

      return acc;
    },
    { completed: [], current: [] }
  );

  return (
    <div
      style={{
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        minHeight: "100vh",
        paddingTop: theme.spacing.xl * 2,
        paddingBottom: theme.spacing.xl * 2,
      }}
    >
      <Container size={500}>
        <Title style={{ textAlign: "center", marginBottom: theme.spacing.xl }}>
          Business Plan
        </Title>

        {items.current}

        {items.completed.length > 0 && (
          <Text color="gray" size="sm" style={{ marginTop: theme.spacing.md }}>
            Completed
          </Text>
        )}
        {items.completed}

        <TextInput
          style={{ marginTop: theme.spacing.xl }}
          value={newItem}
          variant="filled"
          onChange={(event) => setNewItem(event.currentTarget.value)}
          icon={<PlusIcon />}
          placeholder="Add business plan task"
          onKeyDown={(event) => {
            if (
              event.nativeEvent.code === "Enter" &&
              event.currentTarget.value.trim().length > 0
            ) {
              handlers.append({
                value: event.currentTarget.value,
                completed: false,
                key: randomId(),
              });
              setNewItem("");
            }
          }}
        />

        <Select
          label="Your favorite framework/library"
          placeholder="Pick one"
          data={[
            { value: 'react', label: 'React' },
            { value: 'ng', label: 'Angular' },
            { value: 'svelte', label: 'Svelte' },
            { value: 'vue', label: 'Vue' },
          ]}
        />
      </Container>

      <Container size={500} style={{ marginTop: theme.spacing.xl }}>
        <Footer />
      </Container>
    </div>
  );
}
