import { defineConfig } from 'vite';
// import { resolve } from 'path'

export default defineConfig({
    base: '/',
    // build: {
    //     rollupOptions: {
    //         input: {
    //             main: resolve(__dirname, 'index.html'),
    //             palavras_cruzadas: resolve(__dirname, 'HTML/palavras_cruzadas.html'),
    //             jogo_da_memoria: resolve(__dirname, 'HTML/jogo_da_memoria.html'),
    //             quiz: resolve(__dirname, 'HTML/quiz.html'),
    //             questionario: resolve(__dirname, 'HTML/questionario.html'),
    //         },
    //     },
    // },
    optimizeDeps: {
        include: ['jquery'],
    },
});