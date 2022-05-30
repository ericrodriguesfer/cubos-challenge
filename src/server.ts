import app from './app/app';

app.listen(process.env.PORT || 3333, async () =>
  console.log(
    `server was started on url http://localhost:${process.env.PORT || 3333}`,
  ),
);
