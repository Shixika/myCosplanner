import { Pipe, PipeTransform } from '@angular/core';

import { Project } from '../../service/project/project';

@Pipe({ name: 'projectDone' })
export class ProjectsDonePipe implements PipeTransform {
    transform(projects: Project[]): Project[] {
        return projects.filter(project => project.percentDone === 100);
    }
}
