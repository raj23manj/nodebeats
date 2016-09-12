import {Component, EventEmitter, Output, Input, AfterViewInit, OnInit} from '@angular/core';
import {FormControlMessages} from "../../../shared/components/control-valdation-message.component";
import {BlogTagModel, BlogModel, BlogCategoryResponse} from "./blog.model";
import {BlogService} from "./blog.service";
import{TinyEditor} from '../../../shared/components/tinymce.component';
import {Config} from "../../../shared/configs/general.config";
import {ImageCanvasSizeEnum} from "../../../shared/configs/enum.config";
import  {Calendar} from "primeng/primeng";
import {ImageUploader} from "../../../shared/components/image-uploader.component";
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {TagInputComponent} from '../../../shared/components/tag-input/tag-input.component';

@Component({
    selector: 'blog-editor',
    templateUrl: 'admin-templates/blog/blog-editor.html',
    directives: [FormControlMessages, TagInputComponent, Calendar, TinyEditor, ImageUploader],

    // styles: [style]
})
export class BlogEditorComponent implements AfterViewInit,OnInit {
    objBlog:BlogModel = new BlogModel();
    objCatList:BlogCategoryResponse = new BlogCategoryResponse();
    @Input() blogId:string;
    @Output() showListEvent:EventEmitter<any> = new EventEmitter();
    blogForm:FormGroup;
    id:string = "";
    editorFormControl:FormControl = new FormControl('', Validators.required);
    isSubmitted:boolean = false;
    autoCompleteData:string[];
    /* Image Upload Handle*/
    imageDeleted:boolean = false;
    file:File;
    fileName:string = "";
    drawImagePath:string = Config.DefaultWideImage;
    imageFormControl:FormControl = new FormControl('', Validators.required);
    canvasSize:number = ImageCanvasSizeEnum.wide;
    /* End Image Upload handle */


    constructor(private _objService:BlogService, private _formBuilder:FormBuilder) {
    }

    ngAfterViewInit() {
        if (!this.blogId)
            this.drawImageToCanvas(this.drawImagePath);
    }

    createForm() {
        this.blogForm = this._formBuilder.group({
            "blogTitle": ['', Validators.required],
            "blogSummary": ['', Validators.required],
            "blogAuthor": ['', Validators.required],
            "editorFormControl": this.editorFormControl,
            "blogCategory": ['', Validators.required],
            "tags": ['', Validators.required],
            "bannerImageTitle": ['', Validators.required],
            "bannerImageAltText": ['', Validators.required],
            "imageFormControl": this.imageFormControl,
            "status": [''],
            "active": ['']
        });
    }

    ngOnInit() {
        this.createForm();
        this.getCategoryList();
        /*active*/
        if (this.blogId)
            this.getBlogDetail();
        this.getBlogTagList();
    }

    getBlogTagList():void {
        this._objService.getBlogTagList()
            .subscribe(res =>this.bindTagForAutoComplete(res),
                error => this.errorMessage(error));
    }

    bindTagForAutoComplete(res:BlogTagModel[]) {
        let data:string[] = res.map(function (row) {
            return row.tag;
        });
        this.autoCompleteData = data;
    }

    getCategoryList() {
        this._objService.getBlogCategoryList(100, 1, true)
            .subscribe(res=>this.objCatList = res,
                error=>this.errorMessage(error)
            )
    }


    getBlogDetail() {
        this._objService.getBlogDetail(this.blogId)
            .subscribe(res =>this.bindDetail(res),
                error => this.errorMessage(error));
    }

    bindDetail(objRes:BlogModel) {
        let tags = objRes.tags.map(function (res) {
            return res.tag;
        });
        objRes.tags = tags;
        this.objBlog = objRes;
        this.editorFormControl.updateValue(objRes.blogDescription);
        let path:string = "";
        if (this.objBlog.bannerImage) {
            var cl = Config.Cloudinary;
            path = cl.url(this.objBlog.bannerImage);
        }
        else
            path = Config.DefaultWideImage;
        this.drawImageToCanvas(path);
    }


    saveBlog() {
        this.isSubmitted = true;
        this.editorFormControl.updateValue(this.objBlog.blogDescription);
        if (this.blogForm.valid) {
            if (!this.blogId) {
                this._objService.saveBlog(this.objBlog, this.file)
                    .subscribe(res => this.resStatusMessage(res),
                        error => this.errorMessage(error));
            }
            else {
                this._objService.updateBlog(this.objBlog, this.file, this.imageDeleted)
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

    editorValueChange(args) {
        this.objBlog.blogDescription = args;
        // (<FormControl>this.newsForm.controls["editorFormControl"]).updateValue(args);
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

    /*Image Handler */
    changeFile(args) {
        this.file = args;
        if (this.file)
            this.fileName = this.file.name;
    }

    drawImageToCanvas(path:string) {
        this.drawImagePath = path;
    }

    deleteImage(imageId) {

        jQuery.jAlert({
            'type': 'confirm',
            'title': 'Alert',
            'confirmQuestion': 'Are you sure to delete the Image ?',
            'theme': 'red',
            'onConfirm': (e, btn)=> {
                e.preventDefault();
                this._objService.deleteImage(this.objBlog.bannerImage, this.objBlog.imageProperties.imageExtension, this.objBlog.imageProperties.imagePath)
                    .subscribe(res=> {
                            this.imageDeleted = true;
                            this.drawImageToCanvas(Config.DefaultWideImage);
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

    /* End Image Handler */

}

