FROM elixir:1.11.2-alpine
COPY ./ /app
WORKDIR /app
RUN mix local.rebar --force && \
  mix local.hex --force
RUN ["mix", "deps.get"]
RUN ["mix", "compile"]
CMD ["mix", "run", "--no-halt"]