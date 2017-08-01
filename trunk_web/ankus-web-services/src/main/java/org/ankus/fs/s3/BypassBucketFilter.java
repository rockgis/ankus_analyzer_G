/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.ankus.fs.s3;

/**
 * Bucket의 이름을 필터링하지 않고 그대로 사용하는 필터.
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class BypassBucketFilter implements BucketFilter {

    @Override
    public String filter(String name) {
        return name;
    }

}
