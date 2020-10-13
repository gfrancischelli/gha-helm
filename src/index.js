import Koa from "koa";
import Redis from "ioredis";
import Router from "koa-router";

const redis = new Redis();

const PORT = 8080;

const router = new Router();

const KEY = "urls";

router.use(errors);

router.get("/clear", async (ctx) => {
  const a = await redis.del(KEY);
  ctx.status = 200;
  ctx.body = `Clear ${a}`;
});

router.get("/:msg", async (ctx) => {
  const msg = ctx.params.msg;

  if (msg) {
    await redis.rpush(KEY, msg);
  }

  ctx.status = 200;
  ctx.body = await redis.lrange(KEY, 0, -1);
});

const app = new Koa();

app.use(router.routes(), router.allowedMethods());

app.listen(PORT, () => console.log(`🚀 listening on ${PORT}`));

async function errors(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = JSON.stringify(error, null, 2);
  }
}
