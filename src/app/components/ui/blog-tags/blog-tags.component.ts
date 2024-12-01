import { Component, OnInit } from '@angular/core';
import { TagService } from '../../../services/ui/tag.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Tag } from '../../../models/ui/tag.model';

@Component({
  selector: 'app-blog-tags',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-tags.component.html',
  styleUrl: './blog-tags.component.css'
})
export class BlogTagsComponent implements OnInit {
  tags: Tag[] = []
  constructor(private tagService: TagService) { }
  ngOnInit(): void {
    this.loadTags()
  }

  loadTags(): void {
    this.tagService.getAllTag().subscribe((data) => {
      this.tags = data
    }, (error) => {
      console.log("Tag error : ", error)
    })
  }
}
