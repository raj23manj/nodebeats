import {ImageProperties} from "../../../shared/models/image.model";
export class OrganizationModel {
    _id:string;
    orgName:string;
    country:string = "";
    region:string;
    state:string;
    city:string;
    addressLine:string;
    streetAddress:string;
    zipAddress:string;
    postalCode:number;
    organizationEmail:string;
    phoneNumber:string;
    mobileNumber:string;
    faxNumber:string;
    facebookURL:string;
    twitterURL:string;
    googlePlusURL:string;
    linkedInURL:string;
    youTubeUrl:string;
    instagramUrl:string;
    slogan:string;
    logoImageName:string;
    imageProperties:ImageProperties;
    addedBy:string;
    addedOn:string;
    updatedBy:string;
    updatedOn:string;
}