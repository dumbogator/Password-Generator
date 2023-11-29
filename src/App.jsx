import { useState, useCallback, useEffect, useRef } from "react";

function App() {
    const [length, setLength] = useState(8);
    const [numtake, setNumtake] = useState(true);
    const [specialchars, setSpecialchars] = useState(true);
    const [password, SetPassword] = useState("");
    const [copied, setCopied] = useState(false);

    // useRef hook
    const passRef = useRef(null);

    const copyPassword = useCallback(() => {
        window.navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 500);
    }, [password]);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numtake) str += "0123456789";
        if (specialchars) str += "~`!@#$%^&*(){}[]/=?+|-_<>',.;:";

        for (let i = 1; i <= length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        SetPassword(pass);
    }, [length, numtake, specialchars, SetPassword]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numtake, specialchars, passwordGenerator]);

    return (
        <>
            <div className="absolute top-28">
                <h1 className="text-4xl text-white px-4 py-2 rounded-lg border-white border-4 text-center mx-[32rem] mt-4 cursor-default">
                    Password Generator
                </h1>
                <div className="text-center text-white mt-8 flex justify-center items-center gap-5">
                    <input
                        type="text"
                        value={password}
                        placeholder="Password"
                        className={`text-${copied ? "black" : "white"} ${
                            copied ? "bg-white" : "bg-black"
                        } outline-none border-2 border-white rounded-md my-6 p-2 text-center h-11 w-72 transition-all duration-500`}
                        readOnly
                        ref={passRef}
                    />
                    <button
                        className="bg-black border-2 border-white rounded-md h-11 px-4 duration-200 hover:bg-white hover:text-black"
                        onClick={copyPassword}
                    >
                        Copy
                    </button>
                </div>
                <div className="flex justify-center m-5">
                    <div
                        id="pass-properties"
                        className="text-white border-2 border-white rounded-md w-80"
                    >
                        <div className="flex gap-6 justify-start items-center m-5">
                            <input
                                onChange={(e) => {
                                    setLength(e.target.value);
                                }}
                                type="range"
                                min={8}
                                max={50}
                                value={length}
                                className="cursor-pointer "
                            />
                            <p>Length: {length}</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 mx-5">
                                <input
                                    className="w-4"
                                    type="checkbox"
                                    defaultChecked={numtake}
                                    id="numberInput"
                                    onChange={() => {
                                        setNumtake((prev) => !prev);
                                    }}
                                />
                                <label htmlFor="numberInput">Numbers?</label>
                            </div>
                            <div className="flex gap-3 mx-5">
                                <input
                                    className="w-4"
                                    type="checkbox"
                                    defaultChecked={specialchars}
                                    id="specialChars"
                                    onChange={() => {
                                        setSpecialchars((prev) => !prev);
                                    }}
                                />
                                <label htmlFor="specialChars">
                                    Characters?
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="text-white ">
                I'm not a UI Designer, so ignore the Interface please. Thankyou!
            </h1>
        </>
    );
}

export default App;
