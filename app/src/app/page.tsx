import TitlePageForm from "@/components/TitlePageForm"

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6 sm:mb-8">
                    RIT TitleCraft
                </h1>
                <TitlePageForm />
            </div>
        </main>
    )
}