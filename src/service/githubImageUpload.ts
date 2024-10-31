export class GithubService {
    public static shared: GithubService = new GithubService()


    async uploadFileApi(token: string, content: string, filePath: string, message: string): Promise<any> {
        const data = {
            message: message,
            content: content
        };


        try {
            const response = await fetch(`https://api.github.com/repos/tamilarasu18/imageUpload/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });


            if (!response.ok) {
                const errorResponse = await response.json(); // Attempt to get error details
                throw new Error(`Error ${response.status}: ${errorResponse.message || response.statusText}`);
            }


            const result = await response.json();
            return result;
        } catch (error) {
            // Type assertion to string
            if (error instanceof Error) {
                console.error("Error uploading file:", error.message);
            } else {
                console.error("Unknown error occurred");
            }
        }
    }


    async getFileSha(token: string, filePath: string): Promise<string | null> {
        try {
            const response = await fetch(`https://api.github.com/repos/tamilarasu18/imageUpload/contents/${filePath}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            if (!response.ok) {
                console.error("Error fetching file SHA:", response.statusText);
                return null;
            }


            const fileData = await response.json();
            return fileData.sha; // Return the SHA of the file
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching file SHA:", error.message);
            }
            return null;
        }
    }


    async deleteFileApi(token: string, filePath: string): Promise<any> {
        const sha = await this.getFileSha(token, filePath); // Get the SHA of the file to delete
        if (!sha) {
            console.error("Failed to retrieve file SHA for deletion.");
            return;
        }
        const data = {
            message: `Deleted ${filePath} file`,
            sha: sha
        };

        try {
            const response = await fetch(`https://api.github.com/repos/tamilarasu18/imageUpload/contents/${filePath}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.log("Unauthorized access");
                }
                const errorResponse = await response.json();
                throw new Error(`Error ${response.status}: ${errorResponse.message || response.statusText}`);
            }

            const result = await response.json();
            return result;

        } catch (error) {
            if (error instanceof Error) {
                console.error("Error deleting file:", error.message);
            } else {
                console.error("Unknown error occurred");
            }
        }
    }
}
