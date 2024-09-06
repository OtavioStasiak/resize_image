const fs = require('fs');
const sharp = require('sharp');

const rawImagesDir = './rawImages';
const resizedImagesDir = './resizedImages';
const targetWidth = 2048; // Largura desejada das imagens redimensionadas
const targetHeight = 2732; // Altura desejada das imagens redimensionadas

// Verifica se o diretório resizedImages existe, senão cria
if (!fs.existsSync(resizedImagesDir)) {
    fs.mkdirSync(resizedImagesDir);
}

// Lê o conteúdo do diretório rawImages
fs.readdir(rawImagesDir, (err, files) => {
    if (err) {
        console.error('Erro ao ler diretório rawImages:', err);
        return;
    }

    // Para cada arquivo encontrado
    files.forEach(file => {
        // Caminho completo do arquivo de origem
        const srcPath = `${rawImagesDir}/${file}`;
        // Caminho completo do arquivo redimensionado
        const destPath = `${resizedImagesDir}/${file}`;

        // Redimensiona a imagem usando o sharp
        sharp(srcPath)
            .resize(targetWidth, targetHeight)
            .toFile(destPath, (err, info) => {
                if (err) {
                    console.error('Erro ao redimensionar imagem:', err);
                    return;
                }
                console.log(`Imagem ${file} redimensionada para largura ${targetWidth}px e altura ${targetHeight}px`);
            });
    });
});
