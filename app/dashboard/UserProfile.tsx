import { getLogtoContext } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/lib/logto";

export default async function UserProfile() {
    const { isAuthenticated, claims } = await getLogtoContext(logtoConfig);
    
    if (!isAuthenticated || !claims) {
        return <div className="text-sm text-gray-400">Not logged in</div>;
    }
    
    return (
        <div className="mb-8 border-b pb-6">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 border rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    <img src={claims!.picture ?? ""} alt="profile" className="h-12 w-12 rounded-full"/>
                </div>
                <div>
                    <h2 className="font-semibold text-lg">
                        Welcome {claims!.username}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Welcome back ✌️
                    </p>
                </div>
            </div>
        </div>
    );
}
