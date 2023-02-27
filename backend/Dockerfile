FROM golang:1.19.2-alpine

WORKDIR /app

COPY . .

RUN go build -o bin/app api/main.go

EXPOSE 8080

CMD ./bin/app

