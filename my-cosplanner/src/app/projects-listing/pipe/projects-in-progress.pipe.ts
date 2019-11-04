import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../../service/project/project';

@Pipe({ name: 'projectInProgress' })
export class ProjectsInProgressPipe implements PipeTransform {
    transform(projects: Project[]): Project[] {
        return projects.filter(project => project.percentDone < 100);
    }
}
