defmodule Bot.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Starts a worker by calling: Bot.Worker.start_link(arg)
      # {Bot.Worker, arg}
      # Use Plug.Cowboy.child_spec/3 to register our endpoint as a plug
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: Bot.Endpoint,
        options: [port: 4001],
        transport_options: [num_acceptors: 10000]
      )
      # {Plug.Cowboy, scheme: :http, plug: Bot.Endpoint, port: 4040}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Bot.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
