//здесь будут все наши комнаты в которых мы общаемся
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import stylesChats from "./chatList.module.css";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem button={true} style={style} key={index}>
      <ListItemText
        className={stylesChats.listItem}
        primary={`Чат ${index + 1}`}
      />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

//к нам приходят сonversations
export const ChatList = ({ conversations, allMessages, addRoom }) => {
  // const [chats, setChats] = useState([
  //   { name: "room 1", id: 1 },
  //   { name: "room 2", id: 2 },
  //   { name: "room 3", id: 3 },
  // ]);
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // const addRoom = () => {
  //   const index = chats.length + 1;
  //   setChats((state) => [...state, { name: `room ${index}`, id: index }]);
  // };

  //теперь перебираем conversations, а не массив заранее определенных бесед
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folder">
        {conversations.map((chat, index) => {
          //на каждой итерации комнат берем и получаем всю историю ее сообщений

          const currentMessages = allMessages[chat.title]; //получаем сообщение по названию комнаты
          const lastMessage = currentMessages[currentMessages.length - 1]; //получаем последнее сообщение
          console.log(lastMessage);
          return (
            <Link
              className={stylesChats.listItemLink}
              key={index}
              to={`/chat/${chat.title}`}
            >
              <ListItem
                key={index}
                button={true}
                selected={selectedIndex === index}
                onClick={(event) => handleListItemClick(event, index)}
              >
                <ListItemText
                  className={stylesChats.chatName}
                  primary={chat.title} //было chat.name
                />
                {lastMessage && (
                  <ListItemText
                    className={stylesChats.listItem}
                    primary={`${lastMessage.author}:${lastMessage.message}`} //и выводим последнее сообщение в верстку
                  />
                )}
              </ListItem>
            </Link>
          );
        })}
      </List>
      <button onClick={addRoom}>Добавить диалог</button>
    </div>
  );
};
