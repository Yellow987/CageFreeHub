import { Button } from "@mui/material"

function Imagery() {
    return (
        <>
            <h2>Imagery</h2>
            <p>Tip: To attract buyers, we recommend you upload at least 4 photos, including photos of eggs, of production system, and lorem ipsum.</p>
            <div>
                <label>Photos of farm</label>
                <Button>Upload photos</Button>
            </div>
            <div>
                <label>Logo (optional)</label>
                <Button>Upload logo</Button>
            </div>
        </>
    )
}

export default Imagery