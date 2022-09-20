import express from "express";
import request from "supertest";

describe("REST API Server", () => {

    const app = express();

    app.get("/", (req, res) => {
        res.status(200).send("L'app funziona correttamente! 👾\n Consulta il README📘 per istruzioni su come utilizzarla");
    });

    app.use((req, res) => {
        res.status(404).send("La pagina è inesistente 👻");
    });

    // before((done) => {
    //     app.listen(3000, () => {
    //       done();
    //     });
    // });

    // after(() => {
    //     console.log("Server tests done!");
    // });

    it("Should create a server without errors", (done) => {
        request(app).get("/").expect(200, done);
    });

    it("Should handle undefined routes", (done) => {
        request(app).get("/notavalidroute").expect(404, done);
    });

});