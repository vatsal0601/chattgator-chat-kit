import React from "react";

interface Props {
	className?: string;
	sender: boolean;
	name: string;
	message: string;
	time: Date;
}

const Message: React.FC<Props> = ({ className = "", sender, name, message, time }) => {
	return (
		<>
			<div className={`flex ${sender ? "self-end" : ""}`}>
				<div
					className={`rounded-lg max-w-md my-4 mx-4 px-2 pl-4 py-2 pb-3 leading-5 tracking-wide ${
						sender ? "bg-blue-600 text-white" : "bg-blue-50 text-slate-600"
					} ${className}`}
				>
					{!sender && (
						<div className="font-semibold hover:underline text-white-600 py-2 cursor-pointer">
							<button className="focus:outline-none">{name}</button>
						</div>
					)}
					{message}
					<div className={`flex items-center py-1 justify-end ${sender ? "text-white" : "text-slate-400"}`}>
						<div className=" text-xs">
							{time.toLocaleTimeString("en-US", {
								hour: "numeric",
								minute: "numeric",
							})}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Message;
