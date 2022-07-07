import NodeRSA from 'node-rsa'
import axios from 'axios'

const PRIVATE_KEY = process.env.NEXT_PUBLIC_WMART_PRIVATE_KEY
const API_KEY = process.env.NEXT_PUBLIC_WMART_API_KEY
const AFFILIATE_KEY = process.env.NEXT_PUBLIC_WMART_AFFILIATE_KEY

const keyData = {
    consumerId: `${API_KEY}`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA1Mxg4vNXl4ZUUGecglvVG09juNL9dtrvAaJUjcCXOkV3bNLx
ObmoFQqUDVdBvwJx0NVO5dx90JCZ13hTdHyyT3dhOEFhDyt8ztqO0YBQArMMUypQ
70Lu5a4Hsu6cfF9itnibfyfdCYuZo7I3UYQxKRfmIdp1tCD/39sufdQtAGTNUYmf
0i+p+BhwMcytZlGNd8QnyfWlVdkOw2pZ0/9QbVGBmtha9onwbUZ7uKFnP7I1uJiq
15KTyKxCgKsezoOLS7n6jRD1gY1UsJZKsm36JLDhXEBUY6//om2fmbhAH8TANEX2
vOsL19jc8BGTeO034X/tNaHT7PI5DfRDFooLWwIDAQABAoIBAQC851my3paJWqQK
ZJAZYPBDOCysbBC5rAy0BKjO1YLqJbSolHGz7s35L9TSKv2gVMk4u8M4Zo4B0fvf
vV9Ib1HTHYTebZt93fsDnh1eeWuNmeh9A3mpjF+K4PzQqOWduwdkOJjBPmAIEzcm
jBRzdsg1VJPkxYvrhcffrzEMXog8aZ/ARHOy98qsLlFJ37B0pSxd3h//gboplVVQ
tqOkS8gLazYNWBLJDlga/b/pTV/8QAKFi0nTyBDwIED7mtCpvdEQJwGj9KsU5wP+
O67X1Ksa7t9bN5B0BJK+DRaSN8a2xVyDGR4NN/SzEAGsHlvhGIlIbz36blRw2v0u
J3LSnIlRAoGBAP4OVVKgZD76JEGzpwYT7mLcJkvkeCrq+Hu0JlsBWmc7f4Dkk0PV
yVHZ+qBEjB2aEmHM6opYzDkgZOek4C1pz5A5BfHctUtlv7eFfnKE+9UpDz8HWgHG
0kU2XGgJbJ6gWPXnuZQJ1QMinVI1qzg/nu3upvs5/8NG5CpZsfd1iAV3AoGBANZt
OeYbar7Dy5Y97wtoyVYxS3Ew6Yz9X7Zii7EwVnGHIurpF7kJNvbo4fA1mil0w3d9
eKzMUTKa5YgYGp9IEpncrRvaMdSty6gBUXdEiC1PXnVBMzA7EdDDmTor8yDN8sJQ
m2lwdzXZtTcoRB9CVVhi1149g0kbohU/Kh2uTLI9AoGBAL80smqZZFkxkhAQ0ef1
IDkvT3NW5EoIxjL0Btn/TrbbRL8RSPSI9hewYrw0Wu/8gVEyFGNDKZDlHIxqvn3v
YNQ+1oaNgbTZQ00wH1a5V3+6g0sAkXE83gxROYLjdOh97fZFDJqqO7M8XgL9eXvA
BjE0qF/z6tZhiF+HWjXQMytJAoGAKXX1PAkRGtHBC8vt7MbWJ1RgwgIzJo/Xceyc
FibCkDERD1sCu0SM3DErfsbeiCWLpg8cxky7Zo2M1EPU4feNoTKKRlhqSjVQq6uV
lPorWpd+LC3vN+Q0DanEdvsIh89KoUf0xO56Hm96GrAue9zXo7945T//oqM1M+aC
vjp1mgECgYA6Co1DKm1SXk9KWQKZeiJySOmL9D3doJRL9QzcoFcbHBHVnmEskd0v
D8i5wjcIvLoxnXM4NkteFTE8JttNN3joZkXNX2b3GKfvM5y7xn2M3rADZbOWjiPA
+687ngytw5cg+cP5b9znS/mKiTU1fyOR+FNQx3piQGE7cTCdIESqnA==
-----END RSA PRIVATE KEY-----`,
    keyVer: 1,
    impactId: `${AFFILIATE_KEY}` // not required
}


const generateWalmartHeaders = () => {
    const { privateKey, consumerId, keyVer } = keyData
    const hashList = {
        'WM_CONSUMER.ID': consumerId,
        'WM_CONSUMER.INTIMESTAMP': Date.now().toString(),
        'WM_SEC.KEY_VERSION': keyVer,
    }
    
    const sortedHashString = `${hashList['WM_CONSUMER.ID']}\n${hashList['WM_CONSUMER.INTIMESTAMP']}\n${hashList['WM_SEC.KEY_VERSION']}\n`
    const signer = new NodeRSA(privateKey, 'pkcs1')
    const signature = signer.sign(sortedHashString)
    const signature_enc = signature.toString('base64')
    
    return {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'WM_SEC.AUTH_SIGNATURE': signature_enc,
        'WM_CONSUMER.INTIMESTAMP': hashList['WM_CONSUMER.INTIMESTAMP'],
        'WM_CONSUMER.ID': hashList['WM_CONSUMER.ID'],
        'WM_SEC.KEY_VERSION': hashList['WM_SEC.KEY_VERSION'],
    }
}

function getRequestParams(productId) {
    const headers = generateWalmartHeaders()
    
    const url = `https://developer.api.walmart.com/api-proxy/service/affil/product/v2/items/${productId}?publisherId=${keyData.impactId}`

    return {
        url,
        headers
    }
}
    
    export default async function handler(req, res) {
        const { productId } = req.body
        
        const { url, headers } = getRequestParams(productId)
        
        axios.get(url, {headers})
        .then(response => {
            return res.status(201).json({ data: response.data })
        })
        .catch((error) => {
            return res.status(400).json({
                error: error
            })
        })
    }
