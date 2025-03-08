import React, { useEffect, useState } from 'react';

export default function Chatbox(props) {
    const { book, isMember, handleChat, chatText, setChatText } = props;
    const [chats, setChats] = useState(book.chats || []);

    // Update local state whenever book.chats changes
    useEffect(() => {
        setChats(book.chats);
    }, [book.chats]);

    return (
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4" id="livechat">
            <div className="row">
                <div className="col-12 text-white bg-primary text-center p-3">
                    <h2>Chat feed</h2>
                </div>
            </div>
            <div className="row" id="chatdisclosure">
                <div className="col-12 text-secondary text-center">
                    <p><b><span className="text-danger">***ALERT***</span></b><br /> This is a public live discussion that may include spoilers.</p>
                </div>
            </div>
            <div className="row">
                <div
                    className="scrollspy-examplethree"
                    style={{ height: '420px', overflowY: 'auto' }}
                >
                    <div className="col-12 p-0" id="chatbox">
                        <ul id="unordered">
                            <li>What do you think of the book everyone?</li>
                            {chats.map((chat) => (
                                <li key={chat.id}>
                                    <div className="mt-3">
                                        <div className="d-flex justify-content-start align-items-center">
                                            <img
                                                className="me-2"
                                                src="https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png"
                                                height={30}
                                            />
                                            <span>
                                                {chat.username} ({new Date(chat.createdAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    hour12: true
                                                })})
                                            </span>
                                        </div>
                                        <p className="mt-2 fw-bold">{chat.chatText}</p>
                                        <hr />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-12" id="comment-box-holder">
                    <div className="row p-2 align-items-center">
                        {isMember ? (
                            <>
                                <div className="col-9">
                                    <input
                                        className="form-control"
                                        type="text"
                                        placeholder="Write a message"
                                        value={chatText}
                                        onChange={(e) => setChatText(e.target.value)}
                                    />
                                </div>
                                <div className="col-3">
                                    <button
                                        id="poston"
                                        type="button"
                                        className="btn btn-primary btn-sm text-white"
                                        onClick={() => {
                                            handleChat();
                                            setChats([...chats, { id: Date.now(), username: "You", chatText, createdAt: new Date() }]);
                                        }}
                                    >
                                        Send message
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-9">
                                    <input className="form-control" type="text" placeholder="Only members can chat here" disabled />
                                </div>
                                <div className="col-3">
                                    <button className="btn btn-danger btn-sm text-white disabled">Members only</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
