import { useState } from "react";
import List from "./List";
import Form from "./Form";
import Button from "./Button";
import Bill from "./Bill";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleOpenModal() {
    setIsOpen((open) => !open);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setIsOpen(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setIsOpen(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <List
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {isOpen && <Form onAddFriend={handleAddFriend} />}

        <Button onClick={handleOpenModal}>
          {!isOpen ? "Add friend" : "Close"}
        </Button>
      </div>
      {selectedFriend && (
        <Bill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
}
