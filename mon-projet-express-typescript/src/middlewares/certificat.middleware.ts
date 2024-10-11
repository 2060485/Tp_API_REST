import fs from 'fs';

export function loadCertificate() {
    let certificatOptions;
    try {
        // Utilisez le chemin approprié pour accéder aux certificats
        certificatOptions = {
            key: fs.readFileSync('./certs/key.pem'),
            cert: fs.readFileSync('./certs/cert.pem')
        };
    } catch (error) {
        console.error("Erreur lors du chargement des certificats SSL :", error);
        process.exit(1); // Arrête l'application si les certificats ne sont pas valides
    }
    return certificatOptions;
}
