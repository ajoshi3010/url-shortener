import {
    SignInButton,
    SignedIn,
    SignedOut,
} from '@clerk/nextjs';
import { useRouter } from "next/navigation";
export const MyUrlsButton = () => {
    const router = useRouter();
    return (
        <div>

            <SignedIn>

                <button
                    className="mt-6 bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    onClick={() => router.push("/urls")}
                >
                    My URLs
                </button>
            </SignedIn>
            <SignedOut>
            <button
                    className="mt-6 bg-gray-500 text-white px-5 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    
                >
                    <SignInButton>My Urls</SignInButton>
                </button>
            </SignedOut>
        </div>

    )
}