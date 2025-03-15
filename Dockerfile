FROM node:22.14.0-alpine AS config-builder

COPY ./ /workspace/

RUN cd /workspace/ \
	&& npm run build \
	&& npm start

#
# ⬇️ main stage
#
FROM twinproduction/gatus:v5.16.0

ENV ALERTING_EMAIL_FROM=
ENV ALERTING_EMAIL_HOST=
ENV ALERTING_EMAIL_PASSWORD=
ENV ALERTING_EMAIL_TO=
ENV ALERTING_EMAIL_USERNAME=

ENV GATUS_LOG_LEVEL=DEBUG

COPY --from=config-builder /workspace/alpine-root/config/ /config/
