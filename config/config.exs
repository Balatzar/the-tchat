# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :tchat,
  ecto_repos: [Tchat.Repo]

# Configures the endpoint
config :tchat, TchatWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "w13kDIZWWGyXvXAE2VDDqd9fkbswVTTk4RFwX0aZaF5NBTeKVzcp15zhnHmUBp4k",
  render_errors: [view: TchatWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Tchat.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
