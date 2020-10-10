import Koa from "koa";
import Router from "koa-router";

const PORT = 8080;

const router = new Router();

router.get("/", (ctx) => {
  ctx.status = 200;
  ctx.body = "Hello World!";
});

const app = new Koa();

app.use(router.routes(), router.allowedMethods());

app.listen(PORT, () => console.log(`🚀 listening on ${PORT}`));
