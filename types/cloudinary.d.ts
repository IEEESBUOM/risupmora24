declare module "cloudinary" {
  export const v2: any;

  interface ConfigOptions {
    cloud_name: string;
    api_key: string;
    api_secret: string;
    [key: string]: any;
  }

  interface UploadOptions {
    folder?: string;
    [key: string]: any;
  }

  interface UrlOptions {
    secure?: boolean;
    [key: string]: any;
  }

  interface UploadResponse {
    public_id: string;
    secure_url: string;
    [key: string]: any;
  }
}
