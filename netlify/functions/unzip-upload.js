const unzipper = require("unzipper");
const ftp = require("basic-ftp");
const fs = require("fs");
const path = require("path");
const os = require("os");
const formidable = require("formidable");

exports.handler = async function (event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const form = formidable({ multiples: false, uploadDir: os.tmpdir(), keepExtensions: true });

    return new Promise((resolve, reject) => {
        form.parse(event, async (err, fields, files) => {
            if (err) {
                resolve({ statusCode: 500, body: "Form parsing failed" });
                return;
            }

            const zipFile = files.file;
            const extractPath = path.join(os.tmpdir(), `unzipped_${Date.now()}`);

            try {
                fs.mkdirSync(extractPath, { recursive: true });

                await fs
                    .createReadStream(zipFile.filepath)
                    .pipe(unzipper.Extract({ path: extractPath }))
                    .promise();

                // FTP upload
                const client = new ftp.Client();
                await client.access({
                    host: "ftp.infomaniak.com",
                    user: "x78906_project",
                    password: "!Toto123",
                    secure: false,
                });

                async function uploadDir(localDir, remoteDir) {
                    await client.ensureDir(remoteDir);
                    const items = fs.readdirSync(localDir);
                    for (const item of items) {
                        const localItemPath = path.join(localDir, item);
                        const stats = fs.statSync(localItemPath);
                        if (stats.isDirectory()) {
                            await uploadDir(localItemPath, path.join(remoteDir, item));
                        } else {
                            await client.uploadFrom(localItemPath, path.join(remoteDir, item));
                        }
                    }
                }

                await uploadDir(extractPath, "/sites/paolo-vincent.fr/game"); // Update this path
                client.close();

                resolve({ statusCode: 200, body: "Upload successful" });
            } catch (e) {
                console.error(e);
                resolve({ statusCode: 500, body: "Error: " + e.message });
            }
        });
    });
};