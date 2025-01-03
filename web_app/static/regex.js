document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('urlInput');
    const fetchButton = document.getElementById('fetchButton');
    const regexPatternInput = document.getElementById('regexPattern');
    const statusMessage = document.getElementById('statusMessage');

    fetchButton.addEventListener('click', async () => {
        const url = urlInput.value;
        const regexPattern = regexPatternInput.value || '';

        if (!url) {
            statusMessage.textContent = "Please enter a valid URL.";
            return;
        }

        statusMessage.textContent = "Fetching images...";

        const requestBody = {
            url,
            regexPattern,
        };

        try {
            const response = await fetch('/regex/extract-media', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            const result = await response.json();

            if (result.success) {
                if (result.images.length > 0) {
                    window.initializeGallery(result.images);
                    statusMessage.textContent = "";
                } else {
                    statusMessage.textContent = "No images found.";
                }
            } else {
                statusMessage.textContent = `Error: ${result.error}`;
            }
        } catch (error) {
            statusMessage.textContent = "An error occurred while fetching images.";
        }
    });
});
