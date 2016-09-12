import {Component, EventEmitter, Output, Input, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {TestimonialModel} from "./testimonial.model";
import {TestimonialService} from "./testimonial.service";
import{Config} from "../../../shared/configs/general.config";
import{ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import {ValidationService} from "../../../shared/services/validation.service";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {Validators, FormBuilder, FormGroup,  FormControl} from "@angular/forms";

@Component({
    selector: 'testimonial-editor',
    templateUrl: 'admin-templates/testimonial/testimonial-editor.html',
    directives: [ FormControlMessages, ImageUploader],
    // styles: [style]
})
export class TestimonialEditorComponent implements OnInit,AfterViewInit {
    objTestimonial:TestimonialModel = new TestimonialModel();
    @Input() testimonialId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    testimonialForm:FormGroup;
    isSubmitted:boolean = false;

    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultAvatar;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasSize:number = ImageCanvasSizeEnum.small;
    /* End Image Upload handle */


    constructor(private _objService:TestimonialService, private _formBuilder:FormBuilder) {
        this.objTestimonial.testimonialDate = new Date().toLocaleDateString();
        this.testimonialForm = this._formBuilder.group({
            "personName": ['', Validators.required],
            "organization": ['', Validators.required],
            "testimonialContent": ['', Validators.required],
            "email": ['', ValidationService.emailValidator],
            "imageFormControl": this.imageFormControl,
            designation: [''],
            fbUrl: ['',ValidationService.urlValidator],
            twitterUrl: ['',ValidationService.urlValidator],
            gplusUrl: ['',ValidationService.urlValidator],
            linkendinUrl: ['',ValidationService.urlValidator],
            active: ['']
        });

    }

    ngAfterViewInit() {
        if (!this.testimonialId)
            this.drawImageToCanvas(Config.DefaultAvatar);
    }

    ngOnInit() {
        if (this.testimonialId)
            this.getTestimonialDetail();
    }

    getTestimonialDetail() {
        this._objService.getTestimonialDetail(this.testimonialId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:TestimonialModel) {
        this.objTestimonial = objRes;
        this.objTestimonial.testimonialDate = new Date(this.objTestimonial.testimonialDate).toLocaleDateString();
        let path:string = "";
        if (this.objTestimonial.imageName) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objTestimonial.imageName);
        }
        else
            path = Config.DefaultAvatar;
        this.drawImageToCanvas(path);
    }


    saveTestimonial() {
        this.isSubmitted = true;
        if (this.testimonialForm.valid) {
            if (!this.testimonialId) {
                this._objService.saveTestimonial(this.objTestimonial, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateTestimonial(this.objTestimonial, this.file, this.imageDeleted)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
        }
    }

    resStatusMessage(objSave:any) {
        this.showListEvent.emit(false); // is Form Canceled
        jQuery.jAlert({
            'title': 'Success',
            'content': objSave.message,
            'theme': 'green'
        });
    }

    triggerCancelForm() {
        let isCanceled = true;
        this.showListEvent.emit(isCanceled);
    }

    errorMessage(objResponse:any) {
        jQuery.jAlert({
            'title': 'Alert',
            'content': objResponse.message,
            'theme': 'red'
        });
    }

    /*Image handler */

    deleteImage(id:string) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteImage(this.objTestimonial.imageName, this.objTestimonial.imageProperties.imageExtension, this.objTestimonial.imageProperties.imagePath)
                    .subscribe(res=> {
                            this.imageDeleted = true;
                            this.drawImageToCanvas(Config.DefaultAvatar);
                            jQuery.jAlert({
                                'title': 'Success',
                                'content': res.message,
                                'theme': 'green'
                            });
                        },
                        error=> {
                            jQuery.jAlert({
                                'title': 'Alert',
                                'content': error.message,
                                'theme': 'red'
                            });
                        });
            }
        });
    }

    changeFile(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    /* End ImageHandler */
}

