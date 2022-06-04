import app from './app/App';

const port = process.env.PORT || 3333;

app.listen(port, async () =>
  console.log(`server was started on url http://localhost:${port}`),
);
