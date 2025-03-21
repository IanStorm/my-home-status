FROM node:23.10.0-alpine AS config-builder

COPY ./ /workspace/

RUN cd /workspace/ \
	&& npm clean-install \
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
ENV DOMAIN_01=
ENV DOMAIN_01_SUBDOMAIN_01=
ENV DOMAIN_01_SUBDOMAIN_02=
ENV DOMAIN_02=
ENV DOMAIN_02_SUBDOMAIN_01=
ENV DOMAIN_02_SUBDOMAIN_02=
ENV DOMAIN_02_SUBDOMAIN_03=
ENV PROTON_DOMAINKEY=

ENV GATUS_LOG_LEVEL=DEBUG

COPY --from=config-builder /workspace/alpine-root/config/ /config/
