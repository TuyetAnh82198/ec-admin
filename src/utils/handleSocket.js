import { SOCKET } from "./constants";

export const handleSocketConnect = (socket) => {
  socket.connect();
  return () => {
    socket.disconnect();
  };
};
export const handleSocketConnect2 = (socket) => {
  socket.connect();
};

const handleOnOff = (socket, handleProducts) => {
  socket.on(SOCKET.PRODUCTS.TITLE, handleProducts);
  return () => {
    socket.off(SOCKET.PRODUCTS.TITLE, handleProducts);
  };
};

export const handleSocketAction = {
  products: {
    delete: (socket, setState) => {
      const handleProducts = (data) => {
        if (data.action === SOCKET.PRODUCTS.DELETE) {
          setState(data.products);
        }
      };
      handleOnOff(socket, handleProducts);
    },
  },
};
