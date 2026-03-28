interface TaskLoadingStateProps {
    message: string;
    inline?: boolean;
}

export default function TaskLoadingState({
    message,
    inline = false,
}: TaskLoadingStateProps) {
    if (inline) {
        return (
            <div
                className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700"
                aria-live="polite"
            >
                {message}
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-gray-200 bg-white px-6 py-8 text-sm text-gray-600 shadow-sm">
            {message}
        </div>
    );
}
