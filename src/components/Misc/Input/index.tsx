import { EmojiHappyIcon, PaperClipIcon } from "@heroicons/react/outline";
import { PlayIcon } from "@heroicons/react/solid";
import React, { FC, useState } from "react";

interface Props {
	sendMessage: (message: string) => void;
}

const Input: FC<Props> = ({ sendMessage }) => {
	const [message, setMessage] = useState<string>("");

	return (
		<>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					if (message !== "") {
						sendMessage(message);
						setMessage("");
					}
				}}
				className="w-full py-4 mx-0 bg-blue-50 px-2 z-20 sticky bottom-0 left-0 flex space-x-2 lg:space-x-4"
			>
				{/* <EmojiHappyIcon className="h-8 w-8 cursor-pointer stroke-blue-600 hover:stroke-white hover:fill-blue-600" />
				<PaperClipIcon className="h-8 w-8 stroke-blue-600 cursor-pointer hover:stroke-white hover:fill-blue-600" /> */}
				<input
					type="text"
					placeholder="Your Message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					className="w-full truncate rounded-lg border border-slate-200 p-2 text-sm placeholder-slate-400 ring-blue-600 transition-all focus:border-transparent focus:outline-none focus:ring-2 lg:text-base"
				/>
				<button>
					<PlayIcon className="h-10 w-10 fill-blue-600 cursor-pointer stroke-blue-600 hover:stroke-white hover:fill-blue-600 ml-2" />
				</button>
			</form>
		</>
	);
};

export default Input;
