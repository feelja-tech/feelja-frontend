module.exports = {
  client: {
    service: {
      name: "nudge-api",
      url: "http://localhost:4000/api/graphql",
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJudWRnZV9hcGkiLCJleHAiOjE2MTMyNDE5NTksImlhdCI6MTYxMDY0OTk1OSwiaXNzIjoibnVkZ2VfYXBpIiwianRpIjoiMDM0ZDdkZDUtMmJkYi00MThmLWE0NzUtNjQ3NTk3MDg1NGU4IiwibmJmIjoxNjEwNjQ5OTU4LCJzdWIiOiIxIiwidHlwIjoiYWNjZXNzIn0.T2NqCbvQltq7ctM7n402MZVCpNy4_mV6sYjz7lfaq2mR3kAlGbtIGUuoPt1GBxmUw3z8vZW9fHjy9pbXqwYpKw",
      },
      skipSSLValidation: true,
    },
  },
};
