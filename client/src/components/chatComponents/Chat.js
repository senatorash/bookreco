const Chat = () => {
  return (
    <div>
      <form onSubmit={sendMessageHandler}>
        <div className="form-group">
          <input
            className="form-control"
            placeholder="Enter Message"
            ref={messageRef}
          />
        </div>
      </form>
    </div>
  );
};
export default Chat;
