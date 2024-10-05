/* eslint-disable @stylistic/brace-style */
/* eslint-disable @stylistic/operator-linebreak */
import type {
    APIGatewayProxyEvent,
    APIGatewayProxyEventMultiValueHeaders,
} from 'aws-lambda';

import { Buffer } from 'node:buffer';
import url from 'url';

const getMultiValueHeaders = ({
    headers,
}: {
    headers: Record<string, any>;
}) => {
    const multiValueHeaders: Record<string, string[]> = {};

    Object.entries(headers).forEach(([headerKey, headerValue]) => {
        const headerArray = Array.isArray(headerValue)
            ? headerValue.map(String)
            : [String(headerValue)];

        multiValueHeaders[headerKey.toLowerCase()] = headerArray;
    });

    return multiValueHeaders;
};

const getPathWithQueryStringParams = (event: APIGatewayProxyEvent) => {
    const replaceRegex = new RegExp("^''");

    const { path, multiValueQueryStringParameters: query } = event;

    return url.format({
        pathname: path.replace(replaceRegex, ''),
        query,
    });
};

export const requestMapper = ({ event }: { event: APIGatewayProxyEvent }) => {
    const { httpMethod } = event;

    let headers: Record<string, any> = {};

    if (event.multiValueHeaders) {
        headers = getCommaDelimitedHeaders({
            headersMap: event.multiValueHeaders,
            lowerCaseKey: true,
        });
    } else if (event.headers) {
        headers = event.headers;
    }

    let body: Buffer | null = null;

    if (event.body) {
        const { isBase64Encoded } = event;

        body = getEventBody({ body: event.body, isBase64Encoded });
        headers['content-length'] = Buffer.byteLength(
            body,
            isBase64Encoded ? 'base64' : 'utf8',
        );
    }

    const remoteAddress =
        (event &&
            event.requestContext &&
            event.requestContext.identity &&
            event.requestContext.identity.sourceIp) ||
        // eslint-disable-next-line @stylistic/indent-binary-ops
        '';

    return {
        path: getPathWithQueryStringParams(event),
        body,
        headers,
        method: httpMethod,
        remoteAddress,
    };
};

const getEventBody = ({
    body,
    isBase64Encoded,
}: {
    body: string | null;
    isBase64Encoded: boolean;
}) => {
    return Buffer.from(body as string, isBase64Encoded ? 'base64' : 'utf8');
};

const getCommaDelimitedHeaders = ({
    headersMap,
    separator = ',',
    lowerCaseKey = false,
}: {
    headersMap: APIGatewayProxyEventMultiValueHeaders;
    separator?: string;
    lowerCaseKey?: boolean;
}) => {
    const commaDelimitedHeaders: Record<string, string | undefined> = {};

    Object.entries(headersMap).forEach(([headerKey, headerValue]) => {
        const newKey = lowerCaseKey ? headerKey.toLowerCase() : headerKey;

        if (Array.isArray(headerValue)) {
            commaDelimitedHeaders[newKey] = headerValue.join(separator);
        } else {
            commaDelimitedHeaders[newKey] = headerValue;
        }
    });

    return commaDelimitedHeaders;
};

export const responseMapper = ({
    statusCode,
    body,
    headers,
    isBase64Encoded,
}: any) => {
    const multiValueHeaders = getMultiValueHeaders({ headers });
    const transferEncodingHeader = multiValueHeaders['transfer-encoding'];

    if (transferEncodingHeader && transferEncodingHeader.includes('chunked')) {
        multiValueHeaders['transfer-encoding'] = transferEncodingHeader.filter(
            (headerValue) => headerValue !== 'chunked',
        );
    }

    return {
        statusCode,
        body,
        multiValueHeaders,
        isBase64Encoded,
    };
};
