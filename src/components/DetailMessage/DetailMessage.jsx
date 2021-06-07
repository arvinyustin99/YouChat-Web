const messageTemplate = {
  messageText: String,
  sentAt: TimeRanges,
  sentBy: Number
}

const DetailMessage = (props) => {
  const messageHistory = props && props.messages
    ? props.messages
    : [];
  const renderMessageBubble = messageHistory.map((el, index) => {
    /* Incoming Message */
    if (el.sentBy !== 0){
      return(
        <div className="incoming_msg" key={`incoming-message-${index}`}>
          <div className="received_msg">
            <div className="received_withd_msg">
              <p>
                {el.messageText}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="outgoing_msg" key={`outcoming-message-${index}`}>
          <div className="sent_msg">
            <p>
              { el.messageText }
            </p>
          </div>
        </div>
      );
    }

  });
  return (
    <>
    {renderMessageBubble}
    </>
  );

}

export default DetailMessage;