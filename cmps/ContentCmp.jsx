export function ContentCmp({ onConfirm, onCancel }) {
    return (
        <React.Fragment>
            <h2>Are you sure?</h2>
            <p>This action cannot be undone.</p>
            <div>
                <button onClick={onConfirm}>Cancel</button>
                <button onClick={onCancel}>Confirm</button>
            </div>
        </React.Fragment>
    )
}