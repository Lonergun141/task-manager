interface TaskErrorStateProps {
    message: string;
    inline?: boolean;
    onRetry?: () => void;
}

export default function TaskErrorState({
    message,
    inline = false,
    onRetry,
}: TaskErrorStateProps) {
    if (inline) {
        return (
            <div
                className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                role="alert"
            >
                {message}
            </div>
        );
    }

    return (
        <div>
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {message}
            </div>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-4 rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Retry
                </button>
            )}
        </div>
    );
}
