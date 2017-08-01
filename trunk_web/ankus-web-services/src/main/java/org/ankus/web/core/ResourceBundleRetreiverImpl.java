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
package org.ankus.web.core;

import org.ankus.provider.locale.ResourceBundleRetreiver;
import org.springframework.stereotype.Component;

/**
 * Resource Bundle Retreiver for Localization Implementation.
 *
 * @author Byoung Gon, Kim
 * @since 1.0
 */
@Component
public class ResourceBundleRetreiverImpl implements ResourceBundleRetreiver {

    @Override
    public String message(String mainKey, String subKey, String... args) {
        return new LocaleSupport().message(mainKey, subKey, args);
    }

}
