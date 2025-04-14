export default class RESTClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    isGetterMethod(method) {
        return method.toLowerCase() === 'get';
    }

    async sendRequest(url, method, headers={}, body={}, params={}) {
        // Construct the URL with query parameters if any
        const queryString = new URLSearchParams(params).toString();
        const urlWithParams = queryString ? `${url}?${queryString}` : this.baseUrl;

        const isGetter = this.isGetterMethod(method);

        // Header cleanup
        if (headers === null || headers === undefined) {
            headers = {
                'Content-Type': 'application/json',
            };
        }
        if (headers['Content-Type'] === undefined || headers['Content-Type'] === null) {
            headers['Content-Type'] = 'application/json';
        }
        
        try {
            const response = await fetch(isGetter ? urlWithParams : url, {
                method: method,
                headers: headers,
                body: isGetter ? null : JSON.stringify(body),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
    
    async get(params={}, headers={}) {
        return await this.sendRequest(this.baseUrl, 'GET', headers, null, params);
    }
    async post(body={}, headers={}, params) {
        return await this.sendRequest(this.baseUrl, 'POST', headers, body, params);
    }
}