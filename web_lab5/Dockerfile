# Base image
FROM python:3.9
# Make folder to put our files in
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/backend
COPY ./requirements.txt /usr/src/app/backend/requirements.txt
# Set working directory so that all subsequent command runs in this folder
WORKDIR /usr/src/app/backend
RUN pip install -r requirements.txt
# Copy package json and install dependencies
ENV HOST=127.0.0.1
ENV PORT=5000
# Copy our app
COPY . .
# Expose port to access server
EXPOSE 5000
# Command to run our app
CMD [ "python", "./main.py"]