import { FaEnvelopeOpenText, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const InvitationSummary = ({ invitations = {} }) => {

    const {
        pending = 0,
        accepted = 0,
        rejected = 0
    } = invitations;

    return (

        <div className="bg-white rounded-3xl shadow-xl p-6">

            <h2 className="text-xl font-bold mb-6">

                📩 Invitation Summary

            </h2>

            <div className="space-y-5">

                <Item
                    icon={<FaEnvelopeOpenText className="text-yellow-500"/>}
                    title="Pending"
                    value={pending}
                />

                <Item
                    icon={<FaCheckCircle className="text-green-600"/>}
                    title="Accepted"
                    value={accepted}
                />

                <Item
                    icon={<FaTimesCircle className="text-red-600"/>}
                    title="Rejected"
                    value={rejected}
                />

            </div>

        </div>

    );

};

const Item = ({ icon, title, value }) => (

<div className="flex justify-between items-center">

<div className="flex items-center gap-3">

{icon}

<span>{title}</span>

</div>

<span className="font-bold text-xl">

{value}

</span>

</div>

);

export default InvitationSummary;